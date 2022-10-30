class LRUCache {

    constructor(capacity) {
        this.capacity = capacity;
        this.used = 0;
        this.cache = new Map();
        this.head = {value: 'head', next: null, prev: null};
        this.tail = {value: 'tail', next: null, prev: null};

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    getElement(key) {
        if (!this.cache.has(key)) return null;

        let node = this.cache.get(key);
        this.moveToHead(node);

        return node.value;
    }

    insertElement(key, value) {
        if (this.cache.has(key)) {
            let node = this.cache.get(key);
            node.value = value;
            this.moveToHead(node);
        } else {
            if (this.used == this.capacity) {
                let lastElement = this.popLastElement();
                this.cache.delete(lastElement.key);
                this.used --;
            }

            let node = {value: value, next: null, prev: null, key: key}
            this.insert(node);
            this.cache.set(key, node);
            this.used ++;
        }        
    }

    /**
     *  Inserts node right after the head node
     * @param {*} node 
     */
    insert(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     *  Deletes node from the linked list
     * @param {*} node 
     */
    delete(node) {

        let next = node.next;
        let prev = node.prev;
        prev.next = next
        next.prev = prev;

        node = null
    }

    /**
     * Deletes the last node of the list
     */
    popLastElement() {
        let node = this.tail.prev;
        this.delete(node)

        return node
    }

    /**
     *  Move node to head
     * @param {*} node 
     */
    moveToHead(node) {
        this.delete(node);
        this.insert(node);
    }
}
