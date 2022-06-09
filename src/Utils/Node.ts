export default class Node <T>{
    prev: Node<T> | null = null;
    next: Node<T> | null = null;
    newPrev: Node<T> | null = null;
    newNext: Node<T> | null = null;
    newData: T | null = null;
    dangling: boolean = false;
    className: string = 'node no-pointer';
    constructor (public label: string, public data: T) {
        this.data = data;
        this.className = `node ${label}`;
    }
}