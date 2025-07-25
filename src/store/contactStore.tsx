import { makeAutoObservable } from "mobx";
import { ContactDto } from "src/types/dto/ContactDto";

const getContacts = async () => {
    const response = await fetch('https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json')
    const data = await response.json();
    return data;
}

const contactStore = makeAutoObservable({
    contacts: [] as ContactDto[],
    isLoading: false,
    isError: false,
    current: null as ContactDto | null,
    *get() {
        try {
            contactStore.isLoading = true;
            contactStore.isError = false;
            const result: ContactDto[] = yield getContacts();
            contactStore.contacts = result;
        } catch (error) {
            contactStore.isError = true;
            contactStore.contacts = [];
            contactStore.isLoading = false;
        } finally {
            contactStore.isLoading = false;
        }
    },
    setCurrentContact(contact: ContactDto) {
        contactStore.current = contact;
    }
})

export default contactStore;