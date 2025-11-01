// ✅ User Story 3 - TypeScript Customer Management Module

// Enum for ticket types
enum TicketType {
  STANDARD = "Standard",
  VIP = "VIP",
  STUDENT = "Student"
}

// Interface for customer structure
interface ICustomer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  ticket: TicketType;
  preferences?: string[];
}

// ✅ Simplified decorator (typed loosely to avoid signature errors)
function LogAction(
  target: any,
  propertyKey: string,
  descriptor?: PropertyDescriptor
): void {
  const original = descriptor?.value;
  if (!original) return;
  descriptor.value = function (...args: any[]) {
    console.log(`📘 [LOG] ${propertyKey} called`, args);
    return original.apply(this, args);
  };
}

// CustomerManager class
class CustomerManager {
  private customers: ICustomer[] = [];

  @LogAction
  async fetchFromAPI(url: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load customers");
    this.customers = await response.json();
  }

  @LogAction
  getAllCustomers(): ICustomer[] {
    return this.customers;
  }
}

// ✅ Make class available globally for HTML script
(window as any).CustomerManager = CustomerManager;
