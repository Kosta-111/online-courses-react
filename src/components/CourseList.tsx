import { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

const api = "https://localhost:7114/api/"

interface CourseModel {
    id: number;
    name: string;
    imageUrl: string | null;
    description: string | null;
    language: string;
    price: number;
    discount: number;
    rating: number;
    isCertificate: boolean;
    levelName: string;
    categoryName: string;
}

const columns: TableProps<CourseModel>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Image',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, record) => <img src={text} alt={record.name} style={{height: "30px", margin: "auto", display: "block"}} />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName',
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
        key: 'isCertificate',
        dataIndex: 'isCertificate',
        render: (isCertificate) => (
            <Tag color={isCertificate ? "green" : "red"}>
                {isCertificate ? "Yes" : "No"}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const CourseList: React.FC = () => {

    const [courses, setCourses] = useState<CourseModel[]>();

    useEffect(() => {
        fetch(api + "Courses").then(res => res.json()).then(data => {
            setCourses(data);
        });
    }, []);

    return (<Table<CourseModel> columns={columns} dataSource={courses} />)
};

export default CourseList;