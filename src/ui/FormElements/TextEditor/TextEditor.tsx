'use client';

import cn from 'classnames';
import { ContentState, EditorProps, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { IFieldProps } from '../Field/Field';

import styles from './TextEditor.module.scss';

type TypeEditorFieldsProps = EditorProps & IFieldProps;

interface ITextEditorProps extends Omit<TypeEditorFieldsProps, 'editorState'> {
	onChange: (...event: any[]) => void;
	value: string;
}

export default function TextEditor(props: ITextEditorProps): JSX.Element {
	const { onChange, value, placeholder, error } = props;

	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);
	const [isUpdated, setIsUpdated] = useState<boolean>(false);

	useEffect(() => {
		if (isUpdated) return;

		const defaultValue = value || '';
		const blockFromHtml = htmlToDraft(defaultValue);

		const contentState = ContentState.createFromBlockArray(
			blockFromHtml.contentBlocks,
			blockFromHtml.entityMap
		);

		const newEditorState = EditorState.createWithContent(contentState);
		setEditorState(newEditorState);
	}, [value, isUpdated]);

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true);
		setEditorState(editorState);

		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	return (
		<div className={cn(styles.common, styles.editorWrapper, 'animate-fade')}>
			<label>
				<span>{placeholder}</span>
				<div className={styles.wrapper}>
					<Editor
						toolbarClassName={styles.toolbar}
						editorClassName={styles.editor}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						toolbar={{
							options: ['inline', 'list'],
							inline: {
								inDropdown: false,
								className: undefined,
								component: undefined,
								dropdownClassName: undefined,
								options: ['bold', 'italic', 'underline', 'strikethrough'],
							},
							list: {
								inDrodown: false,
								options: ['unordered', 'ordered'],
							},
						}}
					/>
				</div>

				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		</div>
	);
}
