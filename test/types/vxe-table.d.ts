import 'vxe-table';

declare module 'vxe-table' {

    interface ActivedForm {
        modelRef: Props;
        rulesRef: Props;
        initialModel: Props;
        validateInfos: validateInfos;
        resetFields: (newValues?: Props) => void;
        validate: <T = any>(names?: string | string[], option?: validateOptions) => Promise<T>;
        validateField: <T = any>(name?: string, value?: any, rules?: [Record<string, unknown>], option?: validateOptions) => Promise<T>;
        mergeValidateInfo: (items: validateInfo | validateInfo[]) => validateInfo;
    }

    interface TablePrivateMethods {
        activedForm: { [xid: string]: ActivedForm; };
    }

    interface TableEditMethods {
        activedForm: { [xid: string]: ActivedForm; };
    }
}
