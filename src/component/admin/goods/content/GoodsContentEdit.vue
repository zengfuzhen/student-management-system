<template>
    <div class="edit">
        <!-- 面包屑导航 -->
        <el-breadcrumb  separator-class="el-icon-arrow-right">
             <el-breadcrumb-item :to="{ path:'/' }">首页</el-breadcrumb-item>
             <el-breadcrumb-item>商品管理</el-breadcrumb-item>
             <el-breadcrumb-item>内容管理</el-breadcrumb-item>
             <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- form表单:model关联表单数据，rules设置表单校验规则-->
       <section class="edit_box">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
            label-width="100px" class="edit__form">

            <!-- 字段如果要进行校验或者重置，那么必须设置prop属性才可以 -->
              <el-form-item label="内容标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
                    
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>

        <el-form-item label="所属类别" prop="category_id">
            <!-- 这个select数据是动态获取的，需要v-for渲染option -->
          <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
        <!-- 这里label属性设置option提交文本，value属性设置被选时的值 -->
        <el-option  v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">
            <!-- 根据分类层级生成不同的空隙 -->
            <span v-for="i in (item.class_layer -1)" :key="i">&nbsp;</span>
            <!-- 顶级分类没有空隙 -->
            <span v-if="item.class_layer !=1">|-</span>
            <!-- 显示文本 -->
            <span>{{ item.title }}</span>
        </el-option>
      </el-select>
   </el-form-item>

       <el-form-item label="是否发布" prop="status">
          <el-switch v-model="ruleForm.is_status"></el-switch>
      </el-form-item>

      <el-form-item label="推荐类型" repuired>
          <el-switch v-model="ruleForm.is_silde" active-text="轮播图"></el-switch>
          <el-switch v-model="ruleForm.is_top" active-text="顶置"></el-switch>
          <el-switch v-model="ruleForm.is_hot" active-text="火热"></el-switch>
      </el-form-item>

        <el-form-item label="封面上传">
         <!-- action属性用来配置上传接口, file-list用来关联数据进行展示, list-type用于设置展示的样式 -->
          <!-- on-success属性用于设置图片上传的成功回调, 成功后我们要把服务端返回的数据添加到表单的ruleForm.fileList字段 -->  
           <el-upload class="upload-demo" :action="uploadImgUrl"
           list-type="picture" :file-list="ruleForm.imgList"
           :on-success="uploadImgHandler">
               <el-button size="small" type="primary">图片上传</el-button>
           </el-upload>
         </el-form-item>

       <el-form-item label="附件上传">
           <el-upload class="upload-demo" :action="uploadImgUrl"
          multiple:limit="3" :file-list="ruleForm.fileList"
           :on-success="uploadFileHandler">
             <el-button size="small" type="primary">附件上传</el-button>
       </el-form-item>

       <el-form-item label="商品货号" prop="goods_no">
             <el-input v-model="ruleForm.goods_no"></el-input>
       </el-form-item>

       <el-form-item label="库存数量" prop="stock_quantity">
             <el-input  v-model="ruleForm.stock_quantity"></el-input>
       </el-form-item>

       <el-form-item label="市场价格" prop="market_price">
             <el-input  v-model="ruleForm.market_price"></el-input>
       </el-form-item>

       <el-form-item label="销售价格" prop="sell_price">
             <el-input  v-model="ruleForm.sell_price"></el-input>
       </el-form-item>

       <el-form-item label="内容摘要" prop="zhaiyao">
             <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
       </el-form-item>

       <el-form-item label="详细信息" prop="content">
             <el-input type="textarea" v-model="ruleForm.content"></el-input>
       </el-form-item>

       <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
       </el-form>
        </section>
   </div>
</template>
<script>
// 导入富文本编辑器样式以及组件
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
// import { quillEditor } from 'vue-quill-editor';

export default {
  data(){
      return{
        //   两个文本上传接口，因为上传使用的是elementUI组件，所以必须传完整的接口url
        uploadImgUrl:this.$apiDomain+this.$api.atImg,
        uploadFileUrl:this.$apiDomain+this.$api.atFile,
          id:this.$route.params.id,
        //   表单数据
          ruleForm:{
             "title":"Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣",
                 "sub_title":"英伦轻奢 专柜同款 为不凡而生",
                  "goods_no":"NZ0000000002",
                  "category_id":"151",
                  "stock_quantity":200,
                  "market_price":1000,
                  "sell_price":800,
                  "status":false,
                  "is_slide":false,
                  "is_top":false,
                  "is_hot":true,
                  "zhaiyao":"为不凡而生",
                  "content":"<p><strong>产品参数：</strong></p>",
                    "imgList":[
                             {
                             "name":"wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                             "url":"http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                             "shorturl":"/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"        
                             }
                         ],
                     "fileList":[
                         {
                         "name":"HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                         "url":"http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                         "shorturl":"/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                         }
                     ]
                 },
        // 表单校验
  rules:{
      name:[
          { required:true,message:'请输入活动名称',trigger:'blur'},
          { min:3,max:5,message:'长度在3到5个字符',trigger:'blur'}
      ],
      region:[
          { repuired:true,message:'请选择活动区域',trigger:'change'}
      ],
      date1:[
          { type:'date',required:true,message:'请选择日期',trigger:'change'}    
      ],
      date2:[
          { type:'date',required:true,message:'请选择时间',trigger:'change'}
      ],
      type:[
          { type:'date',required:true,message:'请至少选择一个活动性质',trigger:'change'}
      ],
      resource:[
          { required:true,message:true,message:'请选择活动资源',trigger:'change'}
      ],
      desc:[
          { required:true,message:'请填写活动形式',trigger:'blur'}
      ]
           },
        //    商品分类
           goodsCategory: []
        };
    },
methods:{
//    封面上传成功，要把服务器端返回的url数据结果，保存到form表单当中，将来随着表单提交
    uploadImgHandler(data){
        console.log(arguments);
        this.ruleForm.imgList=[data];//封面图只能有一张，所以直接赋值一个新数组
    },
    // 附件上传成功，要把服务器端返回的url数据结果，保存到form表单当中，将来随着表单提交
    uploadFileHandler(data){
      this.ruleForm.fileList.push(data);
      //封面图只能有一张，所以直接赋值一个新数组
   },
//    获取上传成功，要把服务器端返回的url数据结果，保存到form表单当中，将来随着表单提交
getGoodsCategory(){
    this.$http.get(this.$api.ctList+'goods')
    .then(rep=>{
        this.goodsCategory=rep.data.message;
    });
},
// 获取商品信息，记得后面加上商品ID参数
getGoods(){
    this.$http.get(this.$api.gsDetail+this.id)
    .then(rep=>{
 // 为了让select能够自动选取默认的值。把category_id转换为number，与分类列表的数据类型一致
    rep.data.message.category_id=+rep.data.message.category_id;
    this.ruleForm=rep.data.message;
    });
},
// 修改商品信息，记得后面加上商品ID参数
modifyGoods(){
    this.$http.post(this.$api.gsEdit+this.id,this.ruleForm)
    .then(rep=>this.$alert(rep.data.message));
},
// 表单提交前先进行校验，通过后再调用接口修改
submitForm(forName){
    this.$refs[forName].validate((valid)=>{
        if(valid){
            this.modifyGoods();
        }
    });
},
// 表单重置
resetForm(forName){
    this.$refs[forName].resetFields();
}
    },
    // 页面一上来进行商品数据的回显
    created(){
        this.getGoodsCategory();
        this.getGoods();
    },
    components:{
        quillEditor
    }
  }
</script>
<style scoped lang="less">
.edit{
    &_box{  
        margin-top:20px;
        border:1px solid #ccc;
        border-radius: 8px;
        padding-top: 20px;
    }
      &__form{
         width:450px;
    }
}
   
</style>

