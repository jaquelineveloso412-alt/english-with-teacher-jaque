<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public site content lives in Lovable Cloud tables and is editable only by admin-role users at `/admin`; database RLS is the authorization boundary so content management remains safe outside the UI.
- Uploaded content uses private storage and public pages receive signed URLs only for published records; this keeps drafts and hidden products inaccessible while allowing owner-managed media.
