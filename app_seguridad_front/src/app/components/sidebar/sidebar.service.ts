import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  MENUITEMS: any[] = [];//ROUTES;

  public items = [];//new BehaviorSubject<any[]>(this.MENUITEMS);

  constructor() {
  }

  setMenuItems(menuItems: any[]) {
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
