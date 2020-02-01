/** delete the Role and add Policies */
module.exports = function policy(arc, cfn, stage) {
  // loop through all the cloudformation resources
  let resources = Object.keys(cfn.Resources)
  for (let resource of resources) {
    // we're only interested in lambda functions right now
    if (cfn.Resources[resource].Type === 'AWS::Serverless::Function') {
      // deletes the function role
      delete cfn.Resources[resource].Properties.Role
      // adds a policy read more here: 
      // https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html
      cfn.Resources[resource].Policies = [
        {CloudWatchPutMetricPolicy:{}}
      ]
    }
  }
  // return the modified cloudformation template 
  return cfn
}
