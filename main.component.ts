import { Component } from "@angular/core"
import { UserService } from "./user.service";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from "./signForms/in/loginForm.component";
import { StyleService } from "./style.service";
import { ShareForm } from "./shareForm/share.component";


@Component({
    selector: "main-form",
    templateUrl:"main.component.html",
    styleUrls: ["main.component.css"]
})
export class MainForm{
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private styleService: StyleService
    ){}
    styles = new Array(0);
    userName: string;
    kol: number;
    sharedStyles;
    ngOnInit(){
        document.getElementById("a1").className = "";
        document.getElementById("a2").className = "";
        document.getElementById("a3").className = "";
        document.getElementById("a4").className = "active";

        if (!this.userService.isLogged()){
            this.router.navigate(["/login",{}])
            alert("you are not signed in")
            return;
        } 
        this.router.events.subscribe(
            (evt)=>{
                if (event instanceof NavigationEnd) {
                    this.styles = this.styleService.getStyles();
                }
            }
        )
        this.userName = this.userService.getUserName();
        this.styles = this.userService.getStyles();
        this.styleService.putStyles(this.styles);
        this.sharedStyles = this.userService.getSharedStyles();
        this.styleService.putSharedStyles(this.sharedStyles);
    }  
    openStyle(xml){
        this.router.navigate(["/styleManager",xml.id,xml.xml,xml.Name,"r/w",xml.ownerId])
    }
    AddStyle(){
        this.router.navigate(["/styleManager","%","SomeXML","New style","r/w",this.userService.getUserId()])
    }
    delete(id){
        if(confirm("Are you sure?")){   
            this.styleService.deleteStyle(id).then(
                (val)=>{
                    this.styles = this.styleService.getStyles();
                });
        }
    }
    share(id){
        this.router.navigate(["/sharedWith",id]);
    }
    openSaheredStyle(xml){
        this.router.navigate(["/styleManager",xml.id,xml.xml,xml.Name,xml.acessLevel,xml.ownerId])
    }
    deleteSharing(id){
        if(confirm("Are you sure?")){
            this.styleService.deleteSharing(id).then(
                (val)=>{
                    this.sharedStyles = this.styleService.getSharedStyles();
                });
        }
    }
}