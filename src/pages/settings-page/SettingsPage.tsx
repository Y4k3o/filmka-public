import { AvatarUrlEditor } from "./AvatarUrlEditor";
import { DeleteAccount } from "./DeleteAccount";
import { InfoSection } from "./InfoSection";
import { UpdateEmail } from "./UpdateEmail";
import { UpdatePassword } from "./UpdatePassword";

const SettingsPage = () => {
	return (
		<div className="container w-[600px] space-y-7 py-7">
			<AvatarUrlEditor />
			<InfoSection />
			<UpdateEmail />
			<UpdatePassword />
			<DeleteAccount />
		</div>
	);
};

export default SettingsPage;
