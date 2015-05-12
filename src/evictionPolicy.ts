export class EvictionPolicy {
  constructor(public absoluteTimeout: number) {
  }

  static Never = new EvictionPolicy(Number.MAX_VALUE);
}