'use strict';

import * as React from 'react';
import { EditorLayout, EditorLayoutProps } from './common/Editor'
import { FetchableComponent } from '../../common/lib/fetch'

export interface LayoutProps extends EditorLayoutProps {

}

class PageLayout extends EditorLayout<LayoutProps, {}> {
	constructor(props) {
		super(props)
		this.formName = 'lecture-form'
	}

	main() {
		const { ID, title, slug, content } = this.props.content
		return (
			<div className="wrap">
				<form className="wide-form" name={this.formName} action="POST" onSubmit={this.submit}>
					{this.title(this.update, 'Post', title)}
					<input type="hidden" name="ID" value={ID} />
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-field" name="title" defaultValue={title} placeholder="title" />
					</div>
					<div className="form-group">
						<label>Slug</label>
						<input type="text" className="form-field" name="slug" defaultValue={slug} placeholder="slug" />
					</div>
					<div className="form-group">
						<label htmlFor="content">Content</label>
						<textarea name="downloads" className="form-field" rows={8}>{content}</textarea>
					</div>
					{this.props.waiting && (<div>Now saving lecture...</div>)}
					{this.props.succeeded && (<div>Lecture saved</div>)}
					{this.props.failed && (<div>Save failed. Maybe slug problem.</div>)}
					<div className="button-wrap">
						<button type="submit" className="submit-button">Save</button>
					</div>
				</form>
			</div>
		);
	}
}

export const PostPage = FetchableComponent({
	admin: true,
	id: "lecture",
	resource: "/lecture",
})(PageLayout)