import { Button, Checkbox, Form, FormProps, Input, InputNumber, message, Select, Space, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { CategoryLevelModel, CategoryLevelOption, CourseFormField } from '../models/courses';
import { tokenService } from '../services/token.service';
import axios from 'axios';

const api = import.meta.env.VITE_COURSES_API;
const host = import.meta.env.VITE_HOST;

const normFile = (e: any) => {
    return e?.file.originFileObj;
};

export default function EditCourse() {

    const [categories, setCategories] = useState<CategoryLevelOption[]>([]);
    const [levels, setLevels] = useState<CategoryLevelOption[]>([]);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm<CourseFormField>();

    const config = {
        headers: { Authorization: `Bearer ${tokenService.get()}` }
    };

    useEffect(() => {
        fetch(api + "categories", config).then(res => res.json())
            .then(data => {
                const items = data as CategoryLevelModel[];
                setCategories(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            });
        fetch(api + "levels", config).then(res => res.json())
            .then(data => {
                const items = data as CategoryLevelModel[];
                setLevels(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            });
        axios.get(api + id, config).then(res => {
            form.setFieldsValue(res.data);
            if (res.data.imageUrl) {
                const currentUrl = res.data.imageUrl?.startsWith('https://') || res.data.imageUrl?.startsWith('http://')
                                    ? res.data.imageUrl
                                    : `${host}/${res.data.imageUrl}`;
                setCurrentImageUrl(currentUrl);
            }
        });
    }, []);

    const onSubmit: FormProps<CourseFormField>['onFinish'] = (item) => {
        console.log(item);

        const data = new FormData();
        for (const key in item) {
            data.append(key, item[key as keyof CourseFormField] as string | Blob);
        }

        axios.put(api, data, config).then(res => {
            if (res.status === 200) {
                message.success("Online course edited successfully!");
                navigate("/courses");
            }
        }).catch(err => {
            if (err.response.data.errors) {
                const firstErrorKey = Object.keys(err.response.data.errors)[0];
                message.error(err.response.data.errors[firstErrorKey][0]);
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}>Back</Button>
            <h2>Edit Online Course</h2>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                layout="horizontal"
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item<CourseFormField> hidden name="id"></Form.Item>
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
                <Form.Item<CourseFormField> hidden name="imageUrl"></Form.Item>
                <Form.Item<CourseFormField> label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>                    
                    <Upload maxCount={1}>
                        <img src={currentImageUrl} style={{height: "50px", margin: "10px", verticalAlign: "middle", border: "1px solid"}} />
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
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
                            Save
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}