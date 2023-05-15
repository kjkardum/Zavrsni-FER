export const createProxyPath = (path: string[] = []) => {
    return new Proxy({}, {
        get(target, name) {
            if (name === '__proto__') {
                return {_ProxyPath: path};
            }
            if (name === '_ProxyPath') {
                return path;
            }
            return createProxyPath([...path, name.toString()]);
        }
    });
}