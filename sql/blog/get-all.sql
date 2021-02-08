SELECT fn_drop_func('fn_find_posts');

CREATE OR REPLACE FUNCTION fn_find_post()
RETURNS TABLE(
  id integer,
  title character varying,
  sub_title character varying,
  author character varying,
  src_background character varying,
  alt_background character varying,
  img_author character varying,
  brief_header character varying,
  article character varying,
  is_deleted boolean,
  is_draft boolean,
  created_at timestamp
)
AS
$$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.title,
    a.sub_title,
    a.author,
    a.src_background,
    a.alt_background,
    a.img_author,
    a.brief_header,
    a.article,
    a.is_deleted,
    a.is_draft,
    a.created_at
  FROM post a
    AND (g.is_deleted = false OR _id IS NOT NULL);
END;
$$
LANGUAGE 'plpgsql' STABLE;
