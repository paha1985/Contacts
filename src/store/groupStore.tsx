import { makeAutoObservable } from "mobx";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

const getGroups = async () => {
    const response = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json')
    const data = await response.json();
    return data;
}

const groupStore = makeAutoObservable({
    loadingGroups: false,
    groupContacts: [] as GroupContactsDto[],
    errorGroups: false,

    *get() {
        try {
            groupStore.loadingGroups = true;
            groupStore.errorGroups = false;
            const result: GroupContactsDto[] = yield getGroups();
            groupStore.groupContacts = result;
        } catch (error) {
            groupStore.errorGroups = true;
            groupStore.groupContacts = [];
            groupStore.loadingGroups = false;
        } finally {
            groupStore.loadingGroups = false;
        }
    },
    // setCurrentContact(contact: ContactDto) {
    //     contactStore.current = contact;
    // }
})

export default groupStore;