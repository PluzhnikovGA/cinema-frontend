import { Button } from '@/ui/FormElements/Button/Button';

interface IAdminCreateButton {
	onClick: () => void;
}
export default function AdminCreateButton(
	props: IAdminCreateButton
): JSX.Element {
	const { onClick } = props;

	return <Button onClick={onClick}>Create new</Button>;
}
