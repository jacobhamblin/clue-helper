(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(21)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(8),o=a.n(r),c=(a(15),a(6)),l=a(1),i=a(2),u=a(4),m=a(3),p=a(5),d=(a(16),a(17),a(9)),v=(a(18),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state=a.props.state||{id:0,newPlayerName:"",players:[],play:!1},a.enterGame=function(){a.props.reportState(a.state),a.props.enterGame()},a.removePlayer=function(e){var t=a.state.players;a.setState({players:t.filter(function(t){return t.id!==e})})},a.getPlayersList=function(){return s.a.createElement("ul",{className:"players-list"},a.state.players.map(function(e){return s.a.createElement("li",null,s.a.createElement("span",null,e.name),s.a.createElement("button",{onClick:function(){a.removePlayer(e.id)}},"x"))}))},a.submitPlayer=function(){var e=a.state,t=e.id,n=e.newPlayerName,s=e.players;a.setState({players:[].concat(Object(d.a)(s),[{id:t,name:n}]),newPlayerName:"",id:t+1})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"Setup offset-md-3 col-md-6 col-xs-12"},s.a.createElement("div",{className:"new-player"},s.a.createElement("input",{className:"player-name",placeholder:"player name",onChange:function(t){return e.setState({newPlayerName:t.target.value})},onKeyPress:function(t){"Enter"===t.key&&e.submitPlayer()},value:this.state.newPlayerName}),s.a.createElement("button",{className:"new-player-submit",onClick:function(){return e.submitPlayer()}},"Save Player")),this.getPlayersList(),s.a.createElement("div",{className:"play",onClick:function(){return e.enterGame()}},"Play"))}}]),t}(n.Component)),f=(a(19),a(20),["inherit","#ff785f","#ff2a45","#a143be","#ccc"]);var h=function(e){var t=e.label,a=e.playerID,n=e.updateValue,r=e.value;return s.a.createElement("td",{className:"color",onClick:function(){n(a,t)},style:{backgroundColor:f[r]}})},y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state=a.props.state,a.classicSuspects=["Mr. Green","Prof. Plum","Col. Mustard","Mrs. Peacock","Miss Scarlet","Mrs. White"],a.MDSuspects=a.classicSuspects.concat(["Mme Rose","Sgt. Gray","M. Brunette","Miss Peach"]),a.classicWeapons=["Candlestick","Knife","Lead Pipe","Revolver","Rope","Wrench"],a.MDWeapons=a.classicWeapons.concat(["Poison","Horseshoe"]),a.classicRooms=["Conservatory","Lounge","Kitchen","Library","Hall","Study","Ballroom","Dining Room","Billiard Room"],a.MDRooms=["Courtyard","Gazebo","Drawing Room","Dining Room","Kitchen","Carriage House","Trophy Room","Conservatory","Studio","Billiard Room","Library","Fountain"],a.customSuspects=[],a.customWeapons=[],a.customRooms=[],a.newAssetModal=function(e){a.setState({editingAnAsset:e})},a.removeAssetModal=function(e,t){a.setState({removeAssetType:e,removeAssetLabel:t})},a.removeAsset=function(){var e=a.state.removeAssetType,t=a.state.removeAssetLabel;a["classic"+e],a["MD"+e],a["custom"+e];["classic","MD","custom"].forEach(function(n){a[n+e]=a[n+e].filter(function(e){return e!==t})}),a.setState({removeAssetType:"",removeAssetLabel:""})},a.noteValues=[0,1,2,3,4],a.returnToSetup=function(){a.props.reportState(a.state),a.props.returnToSetup()},a.updateValue=function(e,t){var n=a.state.tracking,s=Object(c.a)({},n);s[e][t]=(s[e][t]+1)%a.noteValues.length,a.setState({tracking:s})},a.submitNewAsset=function(){a["custom"+a.state.editingAnAsset]=a["custom"+a.state.editingAnAsset].concat([a.state.newAsset]),a.setState({editingAnAsset:!1,newAsset:""})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"populateRowsOfType",value:function(e){var t=this,a=this.state,n=a.tracking,r=a.version,o=[],c=[s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"addNew",onClick:function(){t.newAssetModal(e)}},"+"),s.a.createElement("span",{className:"header"},e))].concat(new Array(this.state.players.length));o.push(s.a.createElement("tr",null,c.map(function(e){return s.a.createElement("td",{className:"sectionHeader"},e)})));for(var l=this[r+e].concat(this["custom"+e]),i=function(a){var r=[],c=l[a];r.push(s.a.createElement("td",null,s.a.createElement("div",{className:"assetContainer"},s.a.createElement("div",{className:"removeAsset",onClick:function(){t.removeAssetModal(e,c)}},"-"),s.a.createElement("span",null,c))));for(var i=0;i<t.state.players.length;i++){var u=t.state.players[i].id;r.push(s.a.createElement(h,{value:n[u][c],updateValue:t.updateValue,playerID:u,label:c}))}o.push(s.a.createElement("tr",null,r))},u=0;u<l.length;u++)i(u);return s.a.createElement(s.a.Fragment,null,o)}},{key:"populateBody",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,["Suspects","Weapons","Rooms"].map(function(t){return e.populateRowsOfType(t)}))}},{key:"toggleVersion",value:function(){var e="MD"===this.state.version?"classic":"MD";this.setState({version:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.players,n=t.version,r=a.map(function(e){return e.name}),o="MD"===n?"active":"",c=this.state.editingAnAsset||this.state.removeAssetLabel?"active":"",l=this.state.editingAnAsset&&this.state.editingAnAsset.substr(0,this.state.editingAnAsset.length-1),i=this.state.editingAnAsset?"active":"",u=this.state.removeAssetLabel?"active":"",m=this.state.removeAssetType&&this.state.removeAssetType.substr(0,this.state.removeAssetType.length-1);return s.a.createElement("div",{className:"Game offset-md-3 col-md-6 col-xs-12"},s.a.createElement("div",{className:"top-row"},s.a.createElement("div",{className:"master-detective ".concat(o),onClick:function(){e.toggleVersion()}},"MD"),s.a.createElement("div",{className:"return",onClick:function(){e.returnToSetup()}},"Setup")),s.a.createElement("table",{className:"tracker"},s.a.createElement("tbody",null,s.a.createElement("tr",null,[""].concat(r).map(function(e){return s.a.createElement("td",null,e)})),this.populateBody())),s.a.createElement("div",{className:"modalBackground ".concat(c),onClick:function(t){e.modalContents.contains(t.target)||e.setState({editingAnAsset:!1})}},s.a.createElement("div",{className:"modalContents",ref:function(t){return e.modalContents=t}},s.a.createElement("div",{className:"newAsset ".concat(i)},s.a.createElement("h4",null,"Add new ".concat(l)),s.a.createElement("div",{className:"inputContainer"},s.a.createElement("input",{type:"text",onChange:function(t){e.setState({newAsset:t.target.value})},value:this.state.newAsset,onKeyPress:function(t){"Enter"===t.key&&e.submitNewAsset()}}),s.a.createElement("div",{className:"submit",onClick:this.submitNewAsset},"OK"))),s.a.createElement("div",{className:"removeAsset ".concat(u)},s.a.createElement("h4",null,"Remove ".concat(m," ").concat(this.state.removeAssetLabel)),s.a.createElement("div",{className:"inputContainer"},s.a.createElement("div",{className:"submit",onClick:this.removeAsset},"Yes"),s.a.createElement("div",{className:"submit",onClick:function(){e.setState({removeAssetLabel:"",removeAssetType:""})}},"No"))))))}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state=a.props.state||{game:{version:"classic"},play:!1,setup:void 0},a.handler={get:function(e,t){return e.hasOwnProperty(t)?e[t]:0}},a.updateSetupState=function(e){var t=a.state.game&&a.state.game.tracking||{};e.players.forEach(function(e){t[e.id]=t[e.id]||new Proxy({},a.handler)});var n=Object(c.a)({},a.state.game,{players:e.players,tracking:t});a.setState({setup:e,game:n})},a.updateGameState=function(e){return a.setState({game:e})},a.toggleGameState=function(){return a.setState({play:!a.state.play})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.game,a=e.play,n=e.setup;return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},a?s.a.createElement(y,{state:t,reportState:this.updateGameState,returnToSetup:this.toggleGameState}):s.a.createElement(v,{state:n,reportState:this.updateSetupState,enterGame:this.toggleGameState})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.e42bf68e.chunk.js.map