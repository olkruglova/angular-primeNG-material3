// Abstract class used as a DI token.
// Components depend on the abstraction, not the concrete implementation.
// This is the Dependency Inversion Principle: high-level modules should not
// depend on low-level modules — both should depend on abstractions.
// Swap the implementation in providers without touching any consumer.
export abstract class AbstractLogger {
  abstract log(msg: string): void;
  messages: string[] = [];
}
