import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  public items: MenuItem[] = [];

  constructor() {
  }

  setMenuItems(menuItems: MenuItem[]) {
    if(menuItems == null) return;
    menuItems.forEach((item) => {
      item.title = item.title;
      item.icon = item.icon;
      item.path = item.path;
      item.class = '';
    });

    this.items = menuItems;
  }

  getMenuItems() {
    return this.items;
  }

}
