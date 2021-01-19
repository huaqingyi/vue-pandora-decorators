import 'ant-design-vue';

declare module 'ant-design-vue' {
    class FormInstance {
        modelRef: Props;
        rulesRef: Props;
        initialModel: Props;
        validateInfos: validateInfos;
        resetFields: (newValues?: Props) => void;
        validate: <T = any>(names?: string | string[], option?: validateOptions) => Promise<T>;
        validateField: <T = any>(name?: string, value?: any, rules?: [Record<string, unknown>], option?: validateOptions) => Promise<T>;
        mergeValidateInfo: (items: validateInfo | validateInfo[]) => validateInfo;
    }
}
