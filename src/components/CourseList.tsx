import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { CourseModel } from '../models/courses';
import { tokenService } from '../services/token.service';

const api = import.meta.env.VITE_COURSES_API;
const host = import.meta.env.VITE_HOST;

const CourseList: React.FC = () => {

    const [courses, setCourses] = useState<CourseModel[]>();

    useEffect(() => {
        fetch(api, { headers: {
            Authorization: `Bearer ${tokenService.get()}`
        }})
          .then(res => res.json()).then(data => {
            setCourses(data);
        });
    }, []);

    const columns: TableProps<CourseModel>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (_, item) => <img src={item.imageUrl?.startsWith('https://') || item.imageUrl?.startsWith('http://') || !item.imageUrl
                                        ? item.imageUrl 
                                        : `${host}/${item.imageUrl}`} 
                                        alt={item.name} 
                                        style={{height: "30px", margin: "auto", display: "block"}} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, item) => <Link to={`/details/${item.id}`}>{item.name}</Link>,
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'category',
        },
        {
            title: 'Level',
            dataIndex: 'levelName',
            key: 'level',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },    
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <span>{text}%</span>,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Certificate',
            dataIndex: 'isCertificate',
            key: 'certificate',
            render: (certificate) => 
                certificate ?
                    <Tag color="green">
                        Yes
                    </Tag>
                :
                    <Tag color="red">
                        No
                    </Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => (
                <Space size="middle">
                    <Link to={`/details/${item.id}`}>
                        <Button color="primary" variant="text" icon={<InfoCircleOutlined />}></Button>
                    </Link>
                    <Link to={`/edit/${item.id}`}>
                        <Button type="text" icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm
                        title="Delete course"
                        description={`Are you sure to delete '${item.name}'?`}
                        onConfirm={() => deleteCourse(item.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteCourse = (id: number) => {
        
        fetch(api + id, { method: "DELETE", headers: {
            Authorization: `Bearer ${tokenService.get()}`
        }})
            .then(res => {
                if (res.status === 200) {
                    setCourses(courses?.filter(x => x.id !== id));
                    message.success("Course deleted successfully!");
                }
                else {
                    res.json().then(data => {
                        message.error(data.message ?? data.title);
                    });
                }
            })
            .catch(err => message.error(err.message));
    }

    return (<Table<CourseModel> columns={columns} dataSource={courses} rowKey={i => i.id} />)
};
export default CourseList;