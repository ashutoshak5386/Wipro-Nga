
TypeScript Customer Registration Module
User Story 3 - Setup Instructions


FILES INCLUDED:

1. CustomerModule.ts - Main TypeScript source file
2. tsconfig.json - TypeScript compiler configuration
3. README.txt - This file

REQUIREMENTS:

- Node.js installed (v14 or higher)
- TypeScript compiler (will be installed via npm)

SETUP INSTRUCTIONS:


Step 1: Install TypeScript

Open terminal/command prompt and run:
npm install -g typescript

(Or use npx if you don't want to install globally)

Step 2: Verify Installation

tsc --version

(Should show TypeScript version 4.x or higher)

Step 3: Compile TypeScript to JavaScript

Navigate to the userstory3 folder:
cd userstory3

Compile the TypeScript file:
tsc CustomerModule.ts

Or use the config file:
tsc

Step 4: Check Output

After compilation, you should see:
- CustomerModule.js (compiled JavaScript)
- CustomerModule.d.ts (type declarations)
- dist/ folder (if using tsconfig.json)

Step 5: Run the Compiled JavaScript

node CustomerModule.js

Or in browser, create an HTML file that includes:
<script src="CustomerModule.js"></script>

EXPECTED OUTPUT:

The demo function will display:
- Customer creation logs
- Registration details
- VIP discount calculations
- Corporate bulk pricing
- Iterator demonstrations
- System statistics

FEATURES DEMONSTRATED:

 Interfaces (ICustomer, IEventRegistration)
 Classes (Customer, VIPCustomer, CorporateCustomer)
 Inheritance (extends Customer)
Type Safety (strict type annotations)
 Enums (CustomerType, RegistrationStatus, EventCategory)
 Tuples (ContactInfo, EventDetails, RegistrationResult)
 Decorators (@Log, @ValidateEmail, @MeasurePerformance)
 Iterators (Symbol.iterator, custom iterators)
Modular Structure (export/import)

TROUBLESHOOTING:

If compilation fails:
1. Check TypeScript is installed: tsc --version
2. Ensure experimentalDecorators is enabled in tsconfig.json
3. Check for syntax errors in CustomerModule.ts

If decorators don't work:
1. Verify "experimentalDecorators": true in tsconfig.json
2. Compile with: tsc --experimentalDecorators CustomerModule.ts

FOLDER STRUCTURE:

/userstory3/
│-- CustomerModule.ts
│-- tsconfig.json
│-- README.txt
│-- CustomerModule.js (generated after compilation)
│-- CustomerModule.d.ts (generated after compilation)
└-- dist/ (optional, if using tsconfig outDir)


