import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/woocommerce';

export interface CartItem extends Product {
  quantity: number;
  variation_id?: number | null;
  selectedOptions?: Record<string, string>;
  cartItemId: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variationId?: number | null, selectedOptions?: Record<string, string>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, variationId, selectedOptions) => {
        set((state) => {
          // Generate a unique cart item ID based on product ID and selected options
          const cartItemId = `${product.id}${variationId ? '-' + variationId : ''}${
            selectedOptions && Object.keys(selectedOptions).length > 0
              ? '-' + JSON.stringify(selectedOptions)
              : ''
          }`;

          const existingItem = state.items.find(item => item.cartItemId === cartItemId);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.cartItemId === cartItemId 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true
            };
          }
          return { 
            items: [...state.items, { ...product, quantity: 1, variation_id: variationId, selectedOptions, cartItemId }],
            isOpen: true
          };
        });
      },
      
      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter(item => item.cartItemId !== cartItemId)
        }));
      },
      
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          items: quantity > 0 
            ? state.items.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item)
            : state.items.filter(item => item.cartItemId !== cartItemId)
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const price = item.prices?.price ? parseInt(item.prices.price) / 100 : 0;
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'savons-marino-cart',
      partialize: (state) => ({ items: state.items }) // only persist items, not isOpen state
    }
  )
);
