/**
 * Generator: gpt-image.md → per-operation OpenAPI JSON (Gpt-Image 格式目录).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(
  __dirname,
  '../openapi/generated/ai-model/图像（Images）/Gpt-Image格式',
);

const tag = '图像（Images）/Gpt-Image格式';

const securitySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    description:
      '使用 Bearer Token 认证。\n格式: `Authorization: Bearer sk-xxxxxx`\n',
  },
};

const errorBody = (description) => ({
  description,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              type: { type: 'string' },
              param: { type: ['string', 'null'] },
              code: { type: ['string', 'null'] },
            },
            'x-apifox-orders': ['message', 'type', 'param', 'code'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
});

const stdErrors = {
  400: errorBody('请求参数错误'),
  401: errorBody('未授权'),
  402: errorBody('余额不足'),
  429: errorBody('请求过于频繁'),
  502: errorBody('上游服务错误'),
};

const usageSchema = {
  type: 'object',
  description: 'token 用量（按文本输入 / 图片输入 / 图片输出分别计费）',
  properties: {
    input_tokens: { type: 'integer' },
    output_tokens: { type: 'integer' },
    total_tokens: { type: 'integer' },
    input_tokens_details: {
      type: 'object',
      properties: {
        text_tokens: { type: 'integer', description: '文生图时为文本 token' },
        image_tokens: {
          type: 'integer',
          description: '图生图时 > 0，文生图时为 0',
        },
      },
      'x-apifox-orders': ['text_tokens', 'image_tokens'],
    },
  },
  'x-apifox-orders': [
    'input_tokens',
    'output_tokens',
    'total_tokens',
    'input_tokens_details',
  ],
};

const imageResponseSchema = {
  type: 'object',
  description: 'GPT-Image-2 响应（与《gpt-image.md》一致；始终返回 b64_json）',
  properties: {
    created: { type: 'integer', description: '创建时间戳（Unix 秒）' },
    background: {
      type: 'string',
      enum: ['opaque', 'transparent'],
      description: '背景类型',
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          b64_json: {
            type: 'string',
            description: 'Base64 编码的图片数据（不支持 response_format=url）',
          },
        },
        required: ['b64_json'],
        'x-apifox-orders': ['b64_json'],
      },
    },
    output_format: {
      type: 'string',
      enum: ['png', 'jpeg', 'webp'],
    },
    quality: { type: 'string', enum: ['low', 'medium', 'high'] },
    size: { type: 'string', description: '实际输出尺寸，如 1024x1024' },
    usage: usageSchema,
  },
  'x-apifox-orders': [
    'created',
    'background',
    'data',
    'output_format',
    'quality',
    'size',
    'usage',
  ],
};

const sizeSchema = {
  type: 'string',
  description:
    '预设：1024x1024（默认）、1024x1536、1536x1024、2880x2880、2048x3072、3072x2048；或自定义 WxH（每维为 16 的倍数，总像素 655360~8294400）',
  default: '1024x1024',
};

const gptImage2JsonBodySchema = {
  type: 'object',
  description:
    'GPT-Image-2 请求体。无 `image` 为文生图；携带 `image`（字符串或数组）自动进入图生图。详见《gpt-image.md》。',
  properties: {
    model: {
      type: 'string',
      enum: ['gpt-image-2'],
      description: '固定为 gpt-image-2',
    },
    prompt: { type: 'string', description: '图像描述或编辑指令' },
    n: {
      type: 'integer',
      minimum: 1,
      maximum: 10,
      default: 1,
      description: '生成张数',
    },
    size: sizeSchema,
    quality: {
      type: 'string',
      enum: ['low', 'medium', 'high'],
      default: 'high',
    },
    image: {
      description:
        '图生图必填：单张 URL/base64 字符串，或多张 URL/base64 数组；单张最大 50MB',
      oneOf: [
        { type: 'string' },
        { type: 'array', items: { type: 'string' }, maxItems: 32 },
      ],
    },
    input_fidelity: {
      type: 'string',
      enum: ['low', 'medium', 'high'],
      description: '仅图生图有效：输入保真度',
    },
  },
  required: ['model', 'prompt'],
  'x-apifox-orders': [
    'model',
    'prompt',
    'n',
    'size',
    'quality',
    'image',
    'input_fidelity',
  ],
};

const specs = [
  {
    file: 'post-v1-images-generations-creategptimage2-385320140.json',
    info: {
      title: '图像生成（文生图 / 图生图）',
      version: '1.0.0',
      description:
        '**推荐统一端点**：`POST /v1/images/generations` 同时支持文生图与图生图。携带 `image` 字段即自动路由为图生图，无需切换端点。\n\n模型：`gpt-image-2`（4K、多语言、按 token 计费）。详见《gpt-image.md》。\n',
    },
    paths: {
      '/v1/images/generations': {
        post: {
          tags: [tag],
          summary: 'GPT-Image-2 图像生成',
          description:
            '文生图：仅 `model` + `prompt`（及可选 `size`/`quality`/`n`）。\n\n图生图：额外传 `image`（URL 或 base64 data URI，可数组多图融合）。可选 `input_fidelity`。\n\n响应始终为 `data[].b64_json`，不支持 `response_format=url`。\n',
          operationId: 'creategptimage2generation',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: gptImage2JsonBodySchema,
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '生成成功',
              content: {
                'application/json': { schema: imageResponseSchema },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'post-v1-images-edits-creategptimage2-385320141.json',
    info: {
      title: '图像编辑（edits 端点）',
      version: '1.0.0',
      description:
        '标准 OpenAI 图像编辑端点 `POST /v1/images/edits`，支持 **JSON**（URL/base64）与 **multipart/form-data**（直传文件）。参数与 generations 图生图一致。\n\n详见《gpt-image.md》「图生图（edits 端点）」章节。\n',
    },
    paths: {
      '/v1/images/edits': {
        post: {
          tags: [tag],
          summary: 'GPT-Image-2 图像编辑',
          description:
            'JSON：与 generations 图生图相同字段。\n\nmultipart：使用 `image[]` 上传文件（单张或多张），配合 `model`、`prompt`、`size`、`quality`、`n` 等表单字段。\n',
          operationId: 'creategptimage2edit',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  ...gptImage2JsonBodySchema,
                  required: ['model', 'prompt', 'image'],
                  description:
                    'JSON 图生图/编辑：必须包含 `image`（字符串或数组）',
                },
              },
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  description: '直传图片文件；多图使用 image[] 字段名',
                  properties: {
                    model: { type: 'string', enum: ['gpt-image-2'] },
                    prompt: { type: 'string' },
                    'image[]': {
                      type: 'array',
                      items: { type: 'string', format: 'binary' },
                      description: '一张或多张图片文件',
                    },
                    n: { type: 'integer', minimum: 1, maximum: 10 },
                    size: sizeSchema,
                    quality: {
                      type: 'string',
                      enum: ['low', 'medium', 'high'],
                    },
                    input_fidelity: {
                      type: 'string',
                      enum: ['low', 'medium', 'high'],
                    },
                  },
                  required: ['model', 'prompt'],
                  'x-apifox-orders': [
                    'model',
                    'prompt',
                    'image[]',
                    'n',
                    'size',
                    'quality',
                    'input_fidelity',
                  ],
                },
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '编辑成功',
              content: {
                'application/json': { schema: imageResponseSchema },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const spec of specs) {
  const doc = {
    openapi: '3.1.0',
    info: spec.info,
    servers: [{ url: 'https://api.gravitex.ai' }],
    tags: [{ name: tag }],
    components: { securitySchemes },
    paths: spec.paths,
  };
  fs.writeFileSync(
    path.join(outDir, spec.file),
    JSON.stringify(doc, null, 2),
    'utf8',
  );
  console.log('wrote', spec.file);
}
