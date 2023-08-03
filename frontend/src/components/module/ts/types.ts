type HamburgerMenuList = {
    title: string;
    link?: string;
}[]

type note = {
    id: string;
    date?: string;
    text?: string;
    cw?: boolean;
    user: user;
    files?: file[];
    reactions?: reaction[];
    renoter?: user;
}
type noteData = {
    id: string;
    createdAt: string;
    text?: string;
    cw?: boolean;
    user: user;
    files?: file[];
    reactions?: number[];
    renote?: {
        id: string;
        createdAt: string;
        text?: string;
        cw?: boolean;
        files?: file[];
        user: user;
    }
}

type reaction = {
    name: string;
    count: number;
    link: string;
}

type user = {
    name: string;
    username?: string;
    avatarUrl: string;
}

type file = {
    thumbnailUrl: string;
    url: string;
}