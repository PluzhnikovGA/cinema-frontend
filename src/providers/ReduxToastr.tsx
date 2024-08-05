import ReduxToastrLib from 'react-redux-toastr';

export default function ReduxToastr(): JSX.Element {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	);
}
