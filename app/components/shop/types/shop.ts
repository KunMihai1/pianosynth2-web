export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url?: string;
    category: string;
    item_type: string;      // 'virtual' | 'downloadable'
    file_url?: string;      // path in storage bucket (for downloadable items)
    owned?: boolean;
}