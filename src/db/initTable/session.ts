export default `create table if not exists session (
    id varchar(50) primary key not null comment '会话ID',
    content json not null comment '会话内容',
    deleteTime datetime comment '删除时间, UTC时间'
)`