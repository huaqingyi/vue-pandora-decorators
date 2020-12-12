import { createStore } from 'vuex';
import { PermissionState } from './modules/permission';
import { SettingState } from './modules/setting';
import { UserState } from './modules/user';

export interface IRootState {
    permission: PermissionState;
    setting: SettingState;
    user: UserState;
}

export default createStore<IRootState>({});
