type HamburgerMenuList = {
    title: string;
    link?: string;
}[]

type note = {
    id: string;
    userId: string;
    userName: string;
    date: string;
    avatar: string;
    text?: string;
    files?: {
        thumbnailUrl: string;
        url: string;
    }[]
    reaction?: {
        name: string;
        link: string;
    }[]
    renote?: {
        userId: string;
        userName: string;
        avatar: string;
    }
}