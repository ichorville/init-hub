import { Component, OnInit } from '@angular/core';
import { CsiAuthService, User } from '@csi/csi-auth-v2';
import { CsiSecurityAppmenuService } from '@csi/csi-security-appmenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin-engine';
  public preloader = true;

  constructor( private csiAuthService: CsiAuthService,
    private csiMenuPermissionService: CsiSecurityAppmenuService) {
  }

  ngOnInit(){
    this.csiAuthService.getLoggedUser().subscribe((user: User) => {
        if (user != null) {
            localStorage.removeItem("admin-ui");
            this.csiMenuPermissionService.setUser(user);
            
            this.csiMenuPermissionService.saveModulePermissions("admin-ui", user.id).subscribe(resp => {
                console.log("permission loaded");
                this.preloader = false;
                console.log(resp);
            });
        }
    });
  }
}
