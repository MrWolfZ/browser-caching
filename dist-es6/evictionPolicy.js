export class EvictionPolicy {
    constructor(absoluteTimeout) {
        this.absoluteTimeout = absoluteTimeout;
    }
}
EvictionPolicy.Never = new EvictionPolicy(Number.MAX_VALUE);
