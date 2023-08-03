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
    reactions?: reaction[];
    cw?: boolean;
    renote?: {
        userName: string;
        avatar: string;
    }
}

type reaction = {
    name: string;
    count: number;
    link: string;
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
    reactions?: number[];
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