import { Button, Checkbox, Form, FormProps, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { CategoryLevelModel, CategoryLevelOption, CourseFormField } from '../models/courses';

const api = import.meta.env.VITE_COURSES_API;

export default function CreateCourse() {

    const [categories, setCategories] = useState<CategoryLevelOption[]>([]);
    const [levels, setLevels] = useState<CategoryLevelOption[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api + "categories").then(res => res.json())
            .then(data => {
                const items = data as CategoryLevelModel[];
                setCategories(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            });
        fetch(api + "levels").then(res => res.json())
            .then(data => {
                const items = data as CategoryLevelModel[];
                setLevels(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            });
    }, []);

    const onSubmit: FormProps<CourseFormField>['onFinish'] = (item) => {
        console.log(item);

        fetch(api, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }})
            .then(res => {
                if (res.status === 200) {
                    message.success("Online course created successfully!");
                    navigate("/courses");
                }
                else {
                    res.json().then(data => {
                        message.error(data.message ?? data.title);
                    });
                }
            })
            .catch(err => message.error(err.message));
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}>Back</Button>
            <h2>Create Online Course</h2>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                initialValues={{ isCertificate: false, discount: 0 }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<CourseFormField> label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Name of course!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<CourseFormField> label="Price" name="price"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0.01,
                            message: 'Price must be more than 0!',
                        },
                    ]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Discount" name="discount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 99,
                            message: 'Discount must be in range 0-99!',
                        },
                    ]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Rating" name="rating"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 5,
                            message: 'Rating must be in range 0-5!',
                        },
                    ]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Language" name="language"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Language!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<CourseFormField> label="Category" name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Category!',
                        },
                    ]}>
                    <Select options={categories} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Level" name="levelId"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Level!',
                        },
                    ]}>
                    <Select options={levels} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<CourseFormField> label="Image" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item<CourseFormField> valuePropName="checked" label="Certificate" name="isCertificate">
                    <Checkbox />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}