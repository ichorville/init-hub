import { Component, OnInit } from '@angular/core';
import { ProfileToggleOption, Brand } from '@csi/csi-security-appmenu';
import { CsiAuthService, User } from '@csi/csi-auth-v2';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  public items: any[];
  public profileToggleOption: ProfileToggleOption;
  public brand: Brand;

  constructor(private csiAuthService: CsiAuthService) {

    this.brand = {
      imageSource: "./assets/images/moh-logo-wide.png",
      url: ""
    };
    this.csiAuthService.getLoggedUser().subscribe((user: User) => {
      if (user != null) {
        this.profileToggleOption = {
          name: user.firstName + user.lastName,
          imageSource: './assets/images/user.jpg',
          options: [
            { name: "Profile", url: "" },
            { name: "Logout", url: "" }
          ],
        };
      }
    });
  }



  ngOnInit() {  }

}
