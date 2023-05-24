import openapiSpecification from "@/assets/openapiSpecification";
import {sentenceCase} from "sentence-case";

export const idPattern = `([A-Za-z]*[iI]d)`
const paths = Object.keys(openapiSpecification.paths);
const commonPrefix = paths.reduce((prefix, path) => {
    const i = path.indexOf(prefix);
    return i === 0 ? prefix : prefix.slice(0, i);
}, paths[0]);

let controllers = paths.map(path => path.slice(commonPrefix.length).split("/")[0]);
controllers = controllers.filter((value, index, self) => self.indexOf(value) === index);

const controllerEndpoints = controllers.map(controller => {
    const controllerPaths = paths.filter(path => path.startsWith(commonPrefix + controller));
    const regexPattern = `^${commonPrefix}${controller}/\\{${idPattern}\\}`
    const controllerIdRegex = new RegExp(regexPattern + "$");
    const relatedAnyEntityRegex = new RegExp(regexPattern + "/[a-z]*$");
    const relatedPaths = controllerPaths.filter(path => relatedAnyEntityRegex.test(path) && (openapiSpecification.paths as any)[path]['get']);
    const relatedEntities = relatedPaths.map(path => {
        const relatedEntityBaseRegex = regexPattern + "/" + path.split(commonPrefix + controller)[1].split("/")[2];
        const relatedEntityRegex = new RegExp(relatedEntityBaseRegex + "$");
        const relatedEntityIdRegex = new RegExp(relatedEntityBaseRegex + `/\\{${idPattern}\\}$`);
        const relatedEntityIdActionRegex = new RegExp(regexPattern + `/[a-z]*/\\{${idPattern}\\}/[a-z]*$`);
        const name = path.split(commonPrefix + controller)[1].split("/")[2];
        return {
            name: name,
            titleCaseName: sentenceCase(name),
            get: path,
            getById: controllerPaths.find(path => relatedEntityIdRegex.test(path) && (openapiSpecification.paths as any)[path]['get']),
            post: controllerPaths.find(path => relatedEntityRegex.test(path) && (openapiSpecification.paths as any)[path]['post']),
            put: controllerPaths.find(path => relatedEntityRegex.test(path) && (openapiSpecification.paths as any)[path]['put']),
            delete: controllerPaths.find(path => relatedEntityIdRegex.test(path) && (openapiSpecification.paths as any)[path]['delete']),
            patchActions: controllerPaths.filter(path => relatedEntityIdActionRegex.test(path) && (openapiSpecification.paths as any)[path]['patch']),
        }
    });
    return {
        name: controller,
        titleCaseName: sentenceCase(controller),
        get: controllerPaths.find(path => (path === commonPrefix + controller) && (openapiSpecification.paths as any)[path]['get']),
        getById: controllerPaths.find(path => controllerIdRegex.test(path) && (openapiSpecification.paths as any)[path]['get']),
        post: controllerPaths.find(path => (path === commonPrefix + controller) && (openapiSpecification.paths as any)[path]['post']),
        put: controllerPaths.find(path => controllerIdRegex.test(path) && (openapiSpecification.paths as any)[path]['put']),
        delete: controllerPaths.find(path => controllerIdRegex.test(path) && (openapiSpecification.paths as any)[path]['delete']),
        patchActions: controllerPaths.filter(path => (relatedAnyEntityRegex.test(path) || controllerIdRegex.test(path)) && (openapiSpecification.paths as any)[path]['patch']),
        relatedEntities
    };
}).filter(t => !!t.get);

type SortObjectType = { key: string, order: 'asc' | 'desc' | undefined };


type EnumKeys<T> = {
    [K in keyof T]: T[K] extends { enum: any[] } ? K : never
}[keyof T];
const globalOnlyConfig = () => {
    const g_config = {
        baseUrl: '',
        authentication: {
            loginRoute: undefined as (string|undefined),
            loginResponseToken: (apiResponse: any): string => "",
            authType: 'None' as ('Bearer' | 'Basic' | 'None'),
            onLogout: () => undefined,
        },
        enumMapping: {} as { [key in EnumKeys<typeof openapiSpecification.components.schemas>]?: Map<string | number, string> },
        defineEnumNames: (enumName: EnumKeys<typeof openapiSpecification.components.schemas>, namesMap: Map<string | number, string>
        ) => {
            const model = openapiSpecification.components.schemas[enumName];
            if (!model["enum"]) throw new Error(`Model ${enumName} is not an enum`);
            const enumValues = model["enum"].map(t => t.toString());
            const namesMapKeys = Array.from(namesMap.keys()).map(t => t.toString());
            if (namesMapKeys.length !== enumValues.length) throw new Error(`Names map for enum ${enumName} does not have the same number of values as the enum`);
            if (!namesMapKeys.every(key => enumValues.includes(key))) throw new Error(`Names map for enum ${enumName} does not have the same values as the enum, missing ${enumValues.filter(v => !namesMapKeys.includes(v))}`);
            g_config.enumMapping[enumName] = namesMap;
        }
    }
    return g_config;
};

const globalOverrideableConfig = (setUndefined = false) => ({
    pagination: {
        source: setUndefined ? undefined : 'server',
        firstPageNumber: setUndefined ? undefined : 1,
        defaultPageSize: setUndefined ? undefined : 10,
        pageSizeOptions: setUndefined ? undefined : [10, 20, 50, 100],
        paginationQueryParams: (page: number, pageSize: number, filter: string, sort: SortObjectType) => (setUndefined ? undefined : {
            page: page,
            pageSize: pageSize,
            filter: filter,
            sort: `${sort.order === 'asc' ? 'desc' : '-'}${sort.key}`
        } as any),
        paginationResponse: (response: any) => (setUndefined ? undefined : {
            page: response.page,
            pageSize: response.pageSize,
            totalCount: response.totalCount,
            data: response.data,
        })
    }
})
const controllerOnlyConfig = () => ({
    overrideName: undefined,
    overrideTitleCaseName: undefined,
    representation: (item: any) => JSON.stringify(item),
    controllersForValues: {} as { [key: string]: {name: string, filter?: (item: any) => boolean } },
    overrideActions: {
        get: undefined,
        getById: undefined,
        post: undefined,
        put: undefined,
        delete: undefined,
        patchMethods: (existing: any) => existing,
        relatedEntities: (existing: any) => existing,
    }
})

type ControllerConfigType = ReturnType<typeof controllerOnlyConfig> & ReturnType<typeof globalOverrideableConfig>;


const controllerConfig: {[key: string]: ControllerConfigType} = {};
for (const controller of controllerEndpoints) {
    controllerConfig[controller.name] = {...globalOverrideableConfig(true), ...controllerOnlyConfig()}
    controller.relatedEntities.forEach(relatedController => {
        controllerConfig[`${controller.name}/${relatedController.name}`] = {...globalOverrideableConfig(true), ...controllerOnlyConfig()}
    })
}
export const config = {
    globals: {...globalOnlyConfig(), ...globalOverrideableConfig()},
    controllers: controllerConfig
};
export default controllerEndpoints;

export type ControllerEndpointType = typeof controllerEndpoints[0];
