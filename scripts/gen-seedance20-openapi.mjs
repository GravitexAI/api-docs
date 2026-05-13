/**
 * One-off generator: Seedance 2.0.md → per-operation OpenAPI JSON (Apifox-style layout).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(
  __dirname,
  '../openapi/generated/ai-model/视频（Videos）/Seedance2.0格式',
);

const tag = '视频（Videos）/Seedance 2.0格式';

const securitySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    description:
      '使用 Bearer Token 认证。\n格式: `Authorization: Bearer sk-xxxxxx`\n',
  },
};

const error400 = {
  description: '请求参数错误',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', description: '错误信息' },
              type: { type: 'string', description: '错误类型' },
              param: {
                type: ['string', 'null'],
                description: '相关参数路径',
              },
              code: { type: ['string', 'null'], description: '错误代码' },
            },
            'x-apifox-orders': ['message', 'type', 'param', 'code'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
};

const error401 = {
  description: '未授权',
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
            },
            'x-apifox-orders': ['message', 'type'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
};

const error402 = {
  description: '余额不足',
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
            },
            'x-apifox-orders': ['message', 'type'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
};

const error429 = {
  description: '请求过于频繁',
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
            },
            'x-apifox-orders': ['message', 'type'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
};

const error502 = {
  description: '上游服务错误',
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
            },
            'x-apifox-orders': ['message', 'type'],
          },
        },
        'x-apifox-orders': ['error'],
      },
    },
  },
};

const stdErrors = {
  400: error400,
  401: error401,
  402: error402,
  429: error429,
  502: error502,
};

const videoTaskSchema = {
  type: 'object',
  description:
    '视频任务对象（与《Seedance 2.0.md》查询任务状态章节一致；轮询时字段逐步补齐）',
  properties: {
    id: { type: 'string', description: '任务 ID' },
    task_id: { type: 'string', description: '与 id 一致的任务标识' },
    object: {
      type: 'string',
      description: '资源类型',
      enum: ['video'],
    },
    model: { type: 'string', description: '使用的模型 ID' },
    status: {
      type: 'string',
      description: '任务状态：queued / in_progress / completed / failed',
      enum: ['queued', 'in_progress', 'completed', 'failed'],
    },
    progress: { type: 'integer', description: '进度 0~100' },
    created_at: { type: 'integer', description: '创建时间（Unix 秒）' },
    completed_at: {
      type: 'integer',
      description: '完成时间（Unix 秒），未完成时可能省略',
    },
    video_url: { type: 'string', description: '视频地址（成功时常用）' },
    url: { type: 'string', description: '与 video_url 同义的资源地址' },
    metadata: {
      type: 'object',
      description: '扩展元数据（成功时常见）',
      properties: {
        url: { type: 'string' },
        video_url: { type: 'string' },
        id: { type: 'string' },
        status: { type: 'string' },
        usage: {
          type: 'object',
          properties: {
            total_tokens: { type: 'integer', description: 'token 用量' },
          },
          'x-apifox-orders': ['total_tokens'],
        },
      },
      'x-apifox-orders': ['url', 'video_url', 'id', 'status', 'usage'],
    },
    error: {
      type: 'object',
      description: '失败时的错误信息',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
      },
      'x-apifox-orders': ['message', 'code'],
    },
  },
  'x-apifox-orders': [
    'id',
    'task_id',
    'object',
    'model',
    'status',
    'progress',
    'created_at',
    'completed_at',
    'video_url',
    'url',
    'metadata',
    'error',
  ],
};

const assetItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    user_id: { type: 'integer' },
    channel_id: { type: 'integer' },
    group_id: { type: 'string' },
    virtual_id: { type: 'string' },
    asset_url: { type: 'string', description: 'asset:// 引用，用于视频生成' },
    url: {
      type: 'string',
      description: '上游临时签名预览 URL（约 12 小时有效）',
    },
    filename: { type: 'string' },
    asset_type: {
      type: 'string',
      enum: ['Image', 'Video', 'Audio'],
    },
    status: {
      type: 'string',
      enum: ['pending', 'active', 'failed'],
      description: '素材处理状态',
    },
    space_label: { type: 'string', description: '多上游空间标签，如 A/B/C' },
    created_at: { type: 'integer' },
    updated_at: { type: 'integer' },
  },
  'x-apifox-orders': [
    'id',
    'user_id',
    'channel_id',
    'group_id',
    'virtual_id',
    'asset_url',
    'url',
    'filename',
    'asset_type',
    'status',
    'space_label',
    'created_at',
    'updated_at',
  ],
};

const groupItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    user_id: { type: 'integer' },
    channel_id: { type: 'integer' },
    group_id: { type: 'string' },
    group_type: {
      type: 'string',
      enum: ['aigc', 'liveness_face'],
    },
    name: { type: 'string' },
    description: { type: 'string' },
    project_name: { type: 'string' },
    space_label: { type: 'string' },
    asset_count: { type: 'integer' },
    created_at: { type: 'integer' },
    updated_at: { type: 'integer' },
  },
  'x-apifox-orders': [
    'id',
    'user_id',
    'channel_id',
    'group_id',
    'group_type',
    'name',
    'description',
    'project_name',
    'space_label',
    'asset_count',
    'created_at',
    'updated_at',
  ],
};

const specs = [
  {
    file: 'get-v1-video-generations-task_id-getvideogeneration-383844577.json',
    info: {
      title: '查询视频生成任务状态（Seedance 2.0）',
      version: '1.0.0',
      description:
        '轮询 `GET /v1/video/generations/{task_id}` 获取 Seedance 2.0 视频生成进度与结果。状态：`queued` → `in_progress` → `completed` / `failed`。建议每 5 秒轮询一次。\n\n详见《Seedance 2.0.md》「查询任务状态」章节。\n',
    },
    paths: {
      '/v1/video/generations/{task_id}': {
        get: {
          tags: [tag],
          summary: '查询视频生成任务状态（Seedance 2.0）',
          description:
            '根据任务 ID 返回当前快照；成功时包含 `video_url` / `url` 与 `metadata`。\n',
          operationId: 'getvideogeneration',
          parameters: [
            {
              name: 'task_id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: '创建任务接口返回的 `task_id`（与 `id` 相同）',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '当前任务状态或最终结果',
              content: {
                'application/json': { schema: videoTaskSchema },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'post-v1-asset-groups-createassetgroup-383844578.json',
    info: {
      title: '创建素材组（虚拟 aigc）',
      version: '1.0.0',
      description:
        '创建虚拟素材组（`group_type` 固定为 `aigc`）。真人素材组 `liveness_face` 须走 `POST /v1/visual-validate/session`。\n\n详见《Seedance 2.0.md》「创建素材组」章节。\n',
    },
    paths: {
      '/v1/asset-groups': {
        post: {
          tags: [tag],
          summary: '创建素材组（虚拟 aigc）',
          description:
            '同一用户下虚拟素材组与真人素材组各最多 100 个，配额独立。\n',
          operationId: 'createassetgroup',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  description: '创建素材组请求体（与《Seedance 2.0.md》一致）',
                  properties: {
                    name: { type: 'string', description: '素材组名称' },
                    description: {
                      type: 'string',
                      description:
                        '描述；省略或空串时网关用 API Key 所属用户的 username 兜底',
                    },
                    channel_id: {
                      type: 'integer',
                      description: '上游渠道 ID，省略则自动选择',
                    },
                    group_type: {
                      type: 'string',
                      description: '仅支持 aigc（默认）；liveness_face 不可在此创建',
                      enum: ['aigc'],
                      default: 'aigc',
                    },
                  },
                  required: ['name'],
                  'x-apifox-orders': [
                    'name',
                    'description',
                    'channel_id',
                    'group_type',
                  ],
                },
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '创建成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      group_id: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      channel_id: { type: 'integer' },
                      group_type: {
                        type: 'string',
                        enum: ['aigc'],
                      },
                    },
                    required: ['group_id', 'name', 'group_type'],
                    'x-apifox-orders': [
                      'group_id',
                      'name',
                      'description',
                      'channel_id',
                      'group_type',
                    ],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'get-v1-asset-groups-listassetgroups-383844579.json',
    info: {
      title: '列出素材组',
      version: '1.0.0',
      description:
        '列出当前用户的素材组。未传 `group_type` 时默认仅返回 `aigc` 虚拟素材组。\n\n详见《Seedance 2.0.md》「列出素材组」章节。\n',
    },
    paths: {
      '/v1/asset-groups': {
        get: {
          tags: [tag],
          summary: '列出素材组',
          description:
            '支持 `group_type=aigc|liveness_face|all` 过滤；查看真人组请显式传 `liveness_face` 或 `all`。\n',
          operationId: 'listassetgroups',
          parameters: [
            {
              name: 'group_type',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['aigc', 'liveness_face', 'all'],
                default: 'aigc',
              },
              description: '按素材组类型过滤；默认 aigc',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '素材组列表',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      groups: {
                        type: 'array',
                        items: groupItemSchema,
                      },
                      total: { type: 'integer' },
                      has_byteplus_channels: { type: 'boolean' },
                    },
                    required: ['groups', 'total'],
                    'x-apifox-orders': [
                      'groups',
                      'total',
                      'has_byteplus_channels',
                    ],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'delete-v1-asset-groups-group_id-deleteassetgroup-383844580.json',
    info: {
      title: '删除素材组',
      version: '1.0.0',
      description:
        '删除指定素材组并级联删除组内所有素材（上游 + 本地映射）。\n\n详见《Seedance 2.0.md》「删除素材组」章节。\n',
    },
    paths: {
      '/v1/asset-groups/{group_id}': {
        delete: {
          tags: [tag],
          summary: '删除素材组',
          operationId: 'deleteassetgroup',
          parameters: [
            {
              name: 'group_id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: '素材组 ID',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '删除成功（无固定响应体时也可能返回 204，以网关为准）',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      deleted: { type: 'boolean' },
                      group_id: { type: 'string' },
                    },
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'post-v1-assets-createasset-383844581.json',
    info: {
      title: '创建素材',
      version: '1.0.0',
      description:
        '向素材组提交公网 https URL，由上游拉取并异步处理。支持 `Image` / `Video` / `Audio`。\n\n详见《Seedance 2.0.md》「创建素材」章节（格式与大小约束）。\n',
    },
    paths: {
      '/v1/assets': {
        post: {
          tags: [tag],
          summary: '创建素材',
          description:
            '仅接受公网 https URL；不支持 Base64 / Data URI。处理完成后在列表/详情中可见 `status`。\n',
          operationId: 'createasset',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: '公网 https URL，BytePlus 可直接拉取',
                    },
                    group_id: { type: 'string', description: '素材组 ID' },
                    asset_type: {
                      type: 'string',
                      description: '大小写不敏感；默认 Image',
                      enum: ['Image', 'Video', 'Audio', 'image', 'video', 'audio'],
                    },
                    name: {
                      type: 'string',
                      description: '展示名称，≤64 字符，不参与推理',
                    },
                  },
                  required: ['url', 'group_id'],
                  'x-apifox-orders': ['url', 'group_id', 'asset_type', 'name'],
                },
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '已受理，异步处理中',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      virtual_id: { type: 'string' },
                      asset_url: { type: 'string' },
                      group_id: { type: 'string' },
                      asset_type: {
                        type: 'string',
                        enum: ['Image', 'Video', 'Audio'],
                      },
                      status: {
                        type: 'string',
                        enum: ['pending', 'active', 'failed'],
                      },
                    },
                    required: [
                      'virtual_id',
                      'asset_url',
                      'group_id',
                      'asset_type',
                      'status',
                    ],
                    'x-apifox-orders': [
                      'virtual_id',
                      'asset_url',
                      'group_id',
                      'asset_type',
                      'status',
                    ],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'get-v1-assets-listassets-383844582.json',
    info: {
      title: '列出素材',
      version: '1.0.0',
      description:
        '列出当前用户素材；未传 `group_type` 时默认仅返回虚拟素材组（aigc）内素材。可指定 `group_id` 过滤。\n\n详见《Seedance 2.0.md》「列出素材」章节。\n',
    },
    paths: {
      '/v1/assets': {
        get: {
          tags: [tag],
          summary: '列出素材',
          description:
            '指定 `group_id` 后会忽略 `group_type`（组已隐含类型）。\n',
          operationId: 'listassets',
          parameters: [
            {
              name: 'group_id',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: '按素材组过滤',
            },
            {
              name: 'group_type',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['aigc', 'liveness_face', 'all'],
                default: 'aigc',
              },
              description: '按组类型过滤；默认 aigc',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '素材列表',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      assets: {
                        type: 'array',
                        items: assetItemSchema,
                      },
                      total: { type: 'integer' },
                    },
                    required: ['assets', 'total'],
                    'x-apifox-orders': ['assets', 'total'],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'get-v1-assets-virtual_id-getasset-383844583.json',
    info: {
      title: '查询单个素材',
      version: '1.0.0',
      description:
        '按 `virtual_id` 查询素材详情并刷新上游处理状态。\n\n详见《Seedance 2.0.md》「查询单个素材」章节。\n',
    },
    paths: {
      '/v1/assets/{virtual_id}': {
        get: {
          tags: [tag],
          summary: '查询单个素材',
          operationId: 'getasset',
          parameters: [
            {
              name: 'virtual_id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: '素材 virtual_id（即 asset:// 后的标识）',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '素材详情',
              content: {
                'application/json': { schema: assetItemSchema },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'delete-v1-assets-virtual_id-deleteasset-383844584.json',
    info: {
      title: '删除素材',
      version: '1.0.0',
      description:
        '删除指定素材。\n\n详见《Seedance 2.0.md》「删除素材」章节。\n',
    },
    paths: {
      '/v1/assets/{virtual_id}': {
        delete: {
          tags: [tag],
          summary: '删除素材',
          operationId: 'deleteasset',
          parameters: [
            {
              name: 'virtual_id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: '素材 virtual_id',
            },
          ],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '删除成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      deleted: { type: 'boolean' },
                      virtual_id: { type: 'string' },
                    },
                    required: ['deleted', 'virtual_id'],
                    'x-apifox-orders': ['deleted', 'virtual_id'],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'post-v1-visual-validate-session-createvisualvalidatesession-383844585.json',
    info: {
      title: '发起 H5 活体核验（真人素材组）',
      version: '1.0.0',
      description:
        '创建真人素材组的第一步：返回 BytePlus H5 核验链接与网关签发的 `state`。用户完成核验后回调页会 `postMessage` 结果。\n\n详见《Seedance 2.0.md》「真人素材组：H5 活体核验」章节。\n',
    },
    paths: {
      '/v1/visual-validate/session': {
        post: {
          tags: [tag],
          summary: '发起 H5 活体核验会话',
          description:
            '`expires_in` 为 state 令牌秒数（900）；H5 链接本身另有 BytePlus 约 120 秒有效限制。\n',
          operationId: 'createvisualvalidatesession',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description: '素材组名称（落库并回写火山控制台）',
                    },
                    description: {
                      type: 'string',
                      description: '描述；缺省同素材组创建，username 兜底',
                    },
                    channel_id: {
                      type: 'integer',
                      description: '上游渠道 ID，省略则自动选择',
                    },
                  },
                  required: ['name'],
                  'x-apifox-orders': ['name', 'description', 'channel_id'],
                },
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '会话创建成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      h5_link: { type: 'string' },
                      state: { type: 'string' },
                      channel_id: { type: 'integer' },
                      byted_token: { type: 'string' },
                      expires_in: { type: 'integer', description: 'state 有效期（秒）' },
                    },
                    required: ['h5_link', 'state', 'byted_token', 'expires_in'],
                    'x-apifox-orders': [
                      'h5_link',
                      'state',
                      'channel_id',
                      'byted_token',
                      'expires_in',
                    ],
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
  {
    file: 'post-v1-visual-validate-result-submitvisualvalidateresult-383844586.json',
    info: {
      title: '活体核验结果回调（内部）',
      version: '1.0.0',
      description:
        '由网关内置回调页 `asset-validate-callback.html` 在核验完成后调用，用于落库 `liveness_face` 素材组。**业务侧通常无需直接调用**。\n\n详见《Seedance 2.0.md》接口总览与 H5 流程说明。\n',
    },
    paths: {
      '/v1/visual-validate/result': {
        post: {
          tags: [tag],
          summary: '提交活体核验结果（内部）',
          description:
            '请求体由回调页组装（含 `state`、上游回传参数等），以网关实际实现为准。\n',
          operationId: 'submitvisualvalidateresult',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  description: '回调页转发给网关的核验结果载荷（字段以网关实现为准）',
                  additionalProperties: true,
                },
              },
            },
          },
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: '处理完成',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    additionalProperties: true,
                    description: '成功或错误信息，以网关响应为准',
                  },
                },
              },
            },
            ...stdErrors,
          },
        },
      },
    },
  },
];

for (const spec of specs) {
  const doc = {
    openapi: '3.1.0',
    info: spec.info,
    servers: [{ url: 'https://api.gravitex.ai' }],
    tags: [{ name: tag }],
    components: { securitySchemes },
    paths: spec.paths,
  };
  fs.writeFileSync(path.join(outDir, spec.file), JSON.stringify(doc, null, 2), 'utf8');
  console.log('wrote', spec.file);
}
