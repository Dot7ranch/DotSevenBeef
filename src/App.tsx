import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import OurStoryPage from "./pages/OurStoryPage";
import HistoryPage from "./pages/HistoryPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FAQPage from "./pages/FAQPage";
import ReturnYourBoxPage from "./pages/ReturnYourBoxPage";
import CollectionPage from "./pages/CollectionPage";
import ShopAllPage from "./pages/ShopAllPage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import AccessibilityPage from "./pages/AccessibilityPage";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-barn-red focus:px-4 focus:py-2 focus:rounded focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/our-story" element={<OurStoryPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/return-your-box" element={<ReturnYourBoxPage />} />
      <Route path="/collections/:handle" element={<CollectionPage />} />
      <Route path="/shop-all" element={<ShopAllPage />} />
      <Route path="/product/:handle" element={<ProductPage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
