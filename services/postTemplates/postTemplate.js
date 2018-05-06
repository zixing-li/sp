<div className="row">
  <div className="col-sm-4 col-sm-offset-4">
    <form action="/posts/new" method="post">
      <legend>New Post</legend>
      <div className="form-group">
        <label for="post-title">Title</label>
        <input type="text" name="title" className="form-control" id="post-title" placeholder="Title" />
      </div>
      <div className="form-group">
        <label for="post-url">Url</label>
        <input type="url" name="url" className="form-control" id="post-url" placeholder="https://www.google.com" />
      </div>
      <div className="form-group">
        <label for="post-summary">Summary</label>
        <textarea name="summary" className="form-control" id="post-summary" placeholder="Title"></textarea>
      </div>
      <div className='text-right'>
        <button type="submit" className="btn btn-primary">Reply</button>
      </div>
    </form>
  </div>
</div>