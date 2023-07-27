export type data = {
    active: boolean;
    selectItemId: number;
    listItems: ListItem[];
}

export type ListItem = {
    title: string;
    link?: string;
    id: number;
};