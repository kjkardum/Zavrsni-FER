import openapiSpecification from "@/assets/openapiSpecification";

export const getSpecificationModelChildren = (specificationItem: any, levels = 20) => {
    if (levels <= 0) {
        return {};
    }
    if (specificationItem["$ref"]) {
        const ref = specificationItem["$ref"].split('/');
        const refName = ref[ref.length - 1];
        return getSpecificationModelChildren(openapiSpecification.components.schemas[refName], levels);
    }
    if (specificationItem.type === 'object') {
        return Object.keys(specificationItem.properties).map(key => {
            const additionalData = {}
            if (specificationItem.properties[key]["$ref"]) {
                additionalData['ref'] = specificationItem.properties[key]["$ref"].split('/').pop();
            }
            return {
                name: key,
                type: specificationItem.properties[key].type,
                value: getSpecificationModelChildren(specificationItem.properties[key], levels - 1),
                ...additionalData
            }
        });
    }
    if (specificationItem.type === 'array') {
        return {
            name: 'array',
            type: 'array',
            value: getSpecificationModelChildren(specificationItem.items, levels - 1)
        }
    }
    if (specificationItem.enum) {
        return specificationItem.enum
    }
}