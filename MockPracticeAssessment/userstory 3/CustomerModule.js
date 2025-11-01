"use strict";
// ✅ User Story 3 - TypeScript Customer Management Module
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Enum for ticket types
var TicketType;
(function (TicketType) {
    TicketType["STANDARD"] = "Standard";
    TicketType["VIP"] = "VIP";
    TicketType["STUDENT"] = "Student";
})(TicketType || (TicketType = {}));
// ✅ Simplified decorator (typed loosely to avoid signature errors)
function LogAction(target, propertyKey, descriptor) {
    const original = descriptor?.value;
    if (!original)
        return;
    descriptor.value = function (...args) {
        console.log(`📘 [LOG] ${propertyKey} called`, args);
        return original.apply(this, args);
    };
}
// CustomerManager class
class CustomerManager {
    customers = [];
    async fetchFromAPI(url) {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Failed to load customers");
        this.customers = await response.json();
    }
    getAllCustomers() {
        return this.customers;
    }
}
__decorate([
    LogAction
], CustomerManager.prototype, "fetchFromAPI", null);
__decorate([
    LogAction
], CustomerManager.prototype, "getAllCustomers", null);
// ✅ Make class available globally for HTML script
window.CustomerManager = CustomerManager;
