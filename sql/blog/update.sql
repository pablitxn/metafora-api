SELECT fn_drop_func('fn_update_post');

CREATE OR REPLACE FUNCTION fn_update_post(
  _id integer,
  _title character varying,
  _sub_title character varying,
  _author character varying,
  _src_background character varying,
  _alt_background character varying,
  _img_author character varying,
  _brief_header character varying,
  _article character varying,
  _is_draft boolean
)
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
  is_draft boolean,
  created_at timestamp
)
AS
$$
BEGIN
  UPDATE post p
  SET
    title = _title,
    sub_title = _sub_title,
    author = _author,
    src_background = _src_background,
    alt_background = _alt_background,
    img_author = _img_author,
    brief_header = _brief_header,
    article = _article,
    is_draft = _is_draft

    WHERE p.id = _id;

    RETURN QUERY SELECT * FROM fn_find_program(_id)
    p LIMIT 1;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;