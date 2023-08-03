type HamburgerMenuList = {
    title: string;
    link?: string;
}[]

type note = {
    id: string;
    userId: string;
    userName: string;
    date?: string;
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
    cw?: boolean;
    renote?: {
        userId: string;
        userName: string;
        avatar: string;
    }
}

type noteData = {
    id: string;
    text: string;
    createdAt?: string;
    files: {
        thumbnailUrl: string;
        url: string;
    }[]
    user: {
        name: string;
        username: string;
        avatarUrl: string;
    }
    cw?: boolean;
    renote?: {
        id: string;
        text: string;
        files: {
            thumbnailUrl: string;
            url: string;
        }[]
        user: {
            name: string;
            username: string;
            avatarUrl: string;
        }
    }
}