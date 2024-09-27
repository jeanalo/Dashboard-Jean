import * as components from './components/indexPadre';
import { ussers } from './data/User-data';
import NavBar, { Attribute } from './components/NavBar/navBar';
import MoodBanner, { Attribute1} from './components/moodBanner/moodBanner';
import TodaysMood, { Attribute2 } from './components/todaysMood/todaysMood';
import relatedUsersCard, {relatedUsers} from './components/relatedUsersCard/relatedUsers';
import './components/followBotton/followBotton'; //importante importar asi y no como default o {} xon nombre de la class
import UsersBannerCardimport, { AttributeUsersBanner } from './components/relatedUsersBanner/relatedUsersBanner';



class AppContainer extends HTMLElement {
    relatedUsersRender: relatedUsersCard[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const filteredUsers = ussers.filter(user => {
            const userId = parseInt(user.id, 10); 
            return userId >= 4 && userId <= 11;   
        });


        filteredUsers.forEach(user => {
            const UssersPrint = this.ownerDocument.createElement("related-user") as relatedUsersCard;
            UssersPrint.setAttribute(relatedUsers.image1, user.image);
            UssersPrint.setAttribute(relatedUsers.username1, user.username);
            this.relatedUsersRender.push(UssersPrint);


        })
       
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <nav-bar></nav-bar>
                <mood-banner></mood-banner>
                <todays-mood></todays-mood> 
                <relatedusers-banner></relatedusers-banner>
                <div class="related-users-container"></div>

            `;

            const navBar = this.shadowRoot.querySelector('nav-bar');
            if (navBar) {
                navBar.setAttribute(Attribute.image, 'https://github.com/IsabellaCabrera/assets-img/blob/main/TrendHype.png?raw=true');  
                navBar.setAttribute(Attribute.foryou, 'For You');
                navBar.setAttribute(Attribute.following, 'Following');
            }   
        
            const moodBanner = this.shadowRoot.querySelector('mood-banner');
            if (moodBanner) {
                moodBanner.setAttribute(Attribute1.button1, 'Daily tracker');
                moodBanner.setAttribute(Attribute1.answer, 'Answer daily questions');
                moodBanner.setAttribute(Attribute1.findout, 'Find out today`s mood');
                moodBanner.setAttribute(Attribute1.button2, 'Answer now');
                moodBanner.setAttribute(Attribute1.image, 'https://github.com/IsabellaCabrera/assets-img/blob/main/Group%2018.png?raw=true');
            }


            const todaysMood = this.shadowRoot.querySelector('todays-mood');
            if (todaysMood) {
                todaysMood.setAttribute(Attribute2.image, 'https://github.com/IsabellaCabrera/assets-img/blob/main/Group%2018.png?raw=true');
                todaysMood.setAttribute(Attribute2.quicksearchtext, 'Quick search');
                todaysMood.setAttribute(Attribute2.moodtext, 'Today`s mood');
                todaysMood.setAttribute(Attribute2.profileimage, 'https://github.com/IsabellaCabrera/assets-img/blob/main/Group%2018.png?raw=true');
                todaysMood.setAttribute(Attribute2.profilename, 'Jeanalomia');
                todaysMood.setAttribute(Attribute2.profiledescription, 'Chasing dreams and making memories.');
                todaysMood.setAttribute(Attribute2.followerscount, '500k');
                todaysMood.setAttribute(Attribute2.likescount, '2M');
            }

            const relatedUsersBanner = this.shadowRoot.querySelector('.relatedusers-banner');
            if (relatedUsersBanner){
                relatedUsersBanner.setAttribute(AttributeUsersBanner.message, 'You may be interested in')
            }

            const relatedUsers = this.shadowRoot.querySelector('.related-users-container');
            this.relatedUsersRender.forEach(Element =>{
                if (relatedUsers) {
                    relatedUsers.appendChild(Element);
                    const messageButton = document.createElement('message-button');
                    relatedUsers.appendChild(messageButton);  
                    // las dos lineas anteriores sacarlas y meterlas en los post para follow y unfollow
                    
                }
            })






   
}



} 
}

customElements.define('app-container', AppContainer);

