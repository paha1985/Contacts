import { makeAutoObservable } from "mobx";
import { ContactDto } from "src/types/dto/ContactDto";

const favoritesStore = makeAutoObservable({
    items: [] as ContactDto[],
    ids: ["ecd667da-0513-4dd5-ba50-e7cc69f6573c", "84465d40-ef7b-41c7-8de4-29e7fb4ddd21"] as string[],
    loading: false,
    error: null as string | null
})

export default favoritesStore;