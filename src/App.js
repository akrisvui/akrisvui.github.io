import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const perm = () => {
		//bridge.send("VKWebAppShowWallPostBox", { "owner_id ": -183268158, "message": "Hello!"});
		bridge.send("VKWebAppGetAuthToken", {"app_id": 7366121, "scope": "wall"});
		bridge.subscribe(e => {
			//alert(JSON.stringify(e));
			//alert(JSON.stringify(e));
  		if (e.detail.type === 'VKWebAppAccessTokenReceived') {
				//alert(JSON.stringify(e.detail.data.access_token));
				//alert(JSON.stringify(e.detail.data.access_token));
				bridge.send("VKWebAppCallAPIMethod", {"method": "wall.post", "params": {"owner_id": "-183268158", "message": "Привет", "v":"5.103", "access_token": e.detail.data.access_key}});
				var userB = bridge.send('VKWebAppGetUserInfo');
				alert(JSON.stringify(userB));
				alert(JSON.stringify(e));
  	//}
		//alert(JSON.stringify(e));
	}});
}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} perm={perm}/>
			<Persik id='persik' go={go} />
		</View>
	);
}

export default App;
