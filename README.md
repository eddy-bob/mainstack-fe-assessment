# Mainstack React TypeScript App

A modern React TypeScript application built with Vite, featuring a comprehensive dashboard with transaction management, revenue analytics, and user-friendly interfaces.

## 🚀 Features

- **Dashboard Interface**: Clean and modern UI with navigation between different sections
- **Transaction Management**: View, filter, and manage financial transactions
- **Revenue Analytics**: Interactive charts displaying revenue trends and metrics
- **Date Filtering**: Advanced calendar-based filtering with year navigation
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Data**: Live data fetching from external APIs
- **Type Safety**: Full TypeScript implementation for robust development

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v3
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, alerts, etc.)
│   ├── calendar.tsx    # Date picker component
│   ├── filter-panel.tsx # Transaction filtering interface
│   ├── header.tsx      # Application header
│   ├── navigation.tsx  # Main navigation component
│   ├── revenue-chart.tsx # Revenue visualization
│   ├── transaction-list.tsx # Transaction display component
│   └── ...
├── pages/              # Page components
│   ├── home-page.tsx
│   ├── analytics-page.tsx
│   ├── revenue-page.tsx
│   ├── crm-page.tsx
│   └── apps-page.tsx
├── lib/                # Utility functions and hooks
│   ├── api.ts          # API integration
│   ├── hooks.ts        # Custom React hooks
│   └── utils.ts        # Helper functions
├── types/              # TypeScript type definitions
└── __tests__/          # Test files
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mainstack-fe-assessment
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run test suite
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: End-to-end user interaction testing
- **API Tests**: Data fetching and error handling tests

Run tests:

```bash
pnpm test
```

## 🎨 UI Components

### Core Components

- **Header**: Navigation and user profile section
- **TransactionList**: Displays transactions with filtering capabilities
- **RevenueChart**: Interactive revenue visualization
- **FilterPanel**: Advanced filtering interface with date range selection
- **Calendar**: Custom date picker with year navigation
- **EmptyState**: User-friendly empty state messages

### Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Theme switching capability
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: Comprehensive error states and messages

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://fe-task-api.mainstack.io
```

### Tailwind CSS

The project uses Tailwind CSS v3 with custom configuration:

- Custom color palette
- Responsive breakpoints
- Custom utilities

### TypeScript

- Strict type checking enabled
- Path mapping configured (`@/*` → `src/*`)
- Jest-specific TypeScript configuration

## 📊 API Integration

The application integrates with external APIs for:

- **User Data**: Profile and authentication information
- **Transactions**: Financial transaction data
- **Wallet**: Balance and wallet information

API endpoints are centralized in the `lib/api.ts` file with proper error handling and type safety.

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

Built with ❤️ using React, TypeScript, and modern web technologies.
