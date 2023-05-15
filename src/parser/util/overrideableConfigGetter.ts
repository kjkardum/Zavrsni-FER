import {config} from "@/parser/openapiParser";

export const getConfig = (controller_name: string, path_func: (t: any) => any) => {
    try {
        const configItem = path_func(config.controllers[controller_name]);
        if (configItem === undefined) {
            throw new Error(`Config item ${controller_name} not found`);
        }
        return configItem;
    }
    catch (e) {
        const configItem = path_func(config.globals);
        if (configItem === undefined) {
            throw new Error(`Config item ${controller_name} not found`);
        }
        return configItem;
    }
}

export const loadControllerConfig = (controller_name: string) => (path_func: any) => getConfig(controller_name, path_func)