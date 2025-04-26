import { transformMenuData } from "~/mock/transform";
import { api } from ".";
import type { MenuItem } from "~/types";

const MenuService = {
  async getList(): Promise<MenuItem[]> {
    try {
      const res = await api.call().get("/menus/v1/menus/main-menu");
      const menus = res.data.items.map(transformMenuData);
      return menus;
    } catch (err: any) {
      return [
        {
          id: 1,
          label: 'Trang Chu',
          items: [],
          slug: '/'
        }
      ];
    }
  },
};
export default MenuService;
